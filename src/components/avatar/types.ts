type Style = {
  [key: string]: string | number | boolean
}

export type EarSize = 'attached' | 'detached'
export type HairStyle = 'full' | 'danny' | 'pixie' | 'fonze'
export type HairColor = string
export type EyeStyle = 'eyes' | 'round' | 'smiling'
export type NoseStyle = 'curve' | 'pointed' | 'round'
export type MouthStyle = 'laughing' | 'smile' | 'pucker'
export type ShirtStyle = 'collared' | 'crew' | 'open'
export type EyeBrowStyle = 'up'

export interface AvatarConfig {
  skinColor?: string,
  earSize?: EarSize,
  hairColor?: string,
  hairStyle?: HairStyle,
  eyeStyle?: EyeStyle,
  noseStyle?: NoseStyle,
  mouthStyle?: MouthStyle,
  shirtStyle?: ShirtStyle,
  shirtColor?: string,
  bgColor?: string,
}

export interface AvatarFullConfig extends AvatarConfig {
  eyeBrowStyle?: EyeBrowStyle,
  id?: string;
  user_id?: string;
}

export interface NiceAvatarProps extends AvatarConfig {
  id?: string,
  user_id?: string;
  className?: string,
  style?: Style,
}

export type GenConfigFunc = (config?: AvatarFullConfig | string) => Required<AvatarFullConfig>

export declare const genConfig: GenConfigFunc