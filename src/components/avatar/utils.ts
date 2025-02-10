import {
  AvatarFullConfig,
  GenConfigFunc,
  EarSize,
  HairStyle,
  HairColor,
  EyeStyle,
  NoseStyle,
  MouthStyle,
  ShirtStyle,
} from "./types"

/**
 * Pick random one from the list
 */
interface PickRandomOpt<T> {
  avoidList?: T[],
  usually?: T[]
}

type PickRandomFromList = <T>(data: T[], opt?: PickRandomOpt<T | undefined>) => T;

export const pickRandomFromList: PickRandomFromList = (data, { avoidList = [], usually = [] } = {}) => {
  // Filter out avoid options
  const avoidSet = new Set(
    avoidList.filter((item) => Boolean(item))
  );
  let myData = data.filter((item) => !avoidSet.has(item));

  // Increase selecting possibility of usually options
  const usuallyData = usually
    .filter(Boolean)
    .reduce(
      (acc, cur) => acc.concat(new Array(15).fill(cur)),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [] as any[]
    );
  myData = myData.concat(usuallyData);

  // Pick randon one from the list
  const amount = myData.length;
  const randomIdx = Math.floor(Math.random() * amount);
  return myData[randomIdx];
};

/**
 * Gennerate avatar configurations
 */
export interface DefaultOptions {
  skinColor: string[],
  earSize: EarSize[],
  hairColor: string[],
  hairStyle: HairStyle[],
  eyeStyle: EyeStyle[],
  noseStyle: NoseStyle[],
  mouthStyle: MouthStyle[],
  shirtStyle: ShirtStyle[],
  shirtColor: string[],
  bgColor: string[],
}

export const defaultOptions: DefaultOptions = {
  skinColor: ["#F9C9B6", "#AC6651"],
  earSize: ["attached", "detached"],
  hairColor: ["#000", "#FFF", "#673D1D", "#F1E4CF", "#EDB06A"],
  hairStyle: ["fonze", "pixie", "danny", "full"],
  eyeStyle: ["eyes", "round", "smiling"],
  noseStyle: ["pointed", "curve", "round"],
  mouthStyle: ["laughing", "smile", "pucker"],
  shirtStyle: ["crew", "collared", "open"],
  shirtColor: ["#9EA576", "#71A4E9", "#DC87EB", "#E0B83F", "#E97171", "#E49953", "#99D04B", "#51BCDF"],
  bgColor: ["sun", "sky", "lilac", "poppy", "jaffa", "ivy", "water"],
};

const stringToHashCode = (str: string) : number => {
  if (str.length === 0) return 0
  let hash = 0
  let char
  for (let i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

type PickByHashCodeOpts = {
  avoidList?: string[],
  usually?: string[]
}
const pickByHashCode = (code: number, type: keyof DefaultOptions, opts?: PickByHashCodeOpts): string => {
  const avoidList = opts && opts.avoidList || []
  const usually = opts && opts.usually || []

  // Filter out avoid options
  const avoidSet = new Set<string>(avoidList)
  let myDefaultOptions = defaultOptions[type].filter(item => !avoidSet.has(item))

  // Increase selecting possibility of usually options
  myDefaultOptions = usually
    .filter(Boolean)
    .reduce(
      (acc, cur) => acc.concat(new Array(15).fill(cur)),
      [] as string[]
    )
    .concat(myDefaultOptions)

  const index = code % myDefaultOptions.length
  return myDefaultOptions[index]
}

export const genConfig: GenConfigFunc = (userConfig = {}) => {
  const isSeedConfig = typeof userConfig === 'string';
  const hashCode = isSeedConfig && stringToHashCode(userConfig) || 0
  const response = {} as Required<AvatarFullConfig>;
  response.skinColor = isSeedConfig ? pickByHashCode(hashCode, 'skinColor') : (userConfig.skinColor || pickRandomFromList(defaultOptions.skinColor));
  response.earSize = isSeedConfig ? pickByHashCode(hashCode, 'earSize') as EarSize : (userConfig.earSize || pickRandomFromList(defaultOptions.earSize));
  response.eyeStyle = isSeedConfig ? pickByHashCode(hashCode, 'eyeStyle') as EyeStyle : (userConfig.eyeStyle || pickRandomFromList(defaultOptions.eyeStyle));
  response.noseStyle = isSeedConfig ? pickByHashCode(hashCode, 'noseStyle') as NoseStyle : (userConfig.noseStyle || pickRandomFromList(defaultOptions.noseStyle));
  response.mouthStyle = isSeedConfig ? pickByHashCode(hashCode, 'mouthStyle') as MouthStyle : (userConfig.mouthStyle || pickRandomFromList(defaultOptions.mouthStyle));
  response.shirtStyle = isSeedConfig ? pickByHashCode(hashCode, 'shirtStyle') as ShirtStyle : (userConfig.shirtStyle || pickRandomFromList(defaultOptions.shirtStyle));
  response.hairStyle = isSeedConfig ? pickByHashCode(hashCode, 'hairStyle') as HairStyle : (userConfig.hairStyle || pickRandomFromList(defaultOptions.hairStyle));
  response.hairColor = isSeedConfig ? pickByHashCode(hashCode, 'hairColor') as HairColor : (userConfig.hairColor || pickRandomFromList(defaultOptions.hairColor));
  response.bgColor = isSeedConfig ? pickByHashCode(hashCode, 'bgColor') : (userConfig.bgColor || pickRandomFromList(defaultOptions.bgColor));

  // Shirt color
  response.shirtColor = isSeedConfig
    ? pickByHashCode(hashCode, 'shirtColor')
    : userConfig.shirtColor || pickRandomFromList(defaultOptions.shirtColor);

  // Background color
  response.bgColor = isSeedConfig
      ? pickByHashCode(hashCode, 'bgColor')
      : userConfig.bgColor || pickRandomFromList(defaultOptions.bgColor);

  return response;
};