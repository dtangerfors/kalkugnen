import { JsonValue } from "@prisma/client/runtime/library";
import { Booking as BookingType, Avatar as AvatarType, $Enums, Family } from "@prisma/client";
import { User as ClerkUser } from "@clerk/backend";


export type ExtendedUser = {
  id: string;
  user_color: string;
  user_role: $Enums.user_role_type | null;
  family_id: string | null;
  clerkUser: ClerkUser;
  family?: Family;
};

export type BookingData = BookingType & {
  user: {
    avatar: AvatarType | null
    user_color?: string
  }
}

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  password: string;
  user_color: string;
  user_role: string;
};

export type UpdateUserForm = {
  user_role: string;
  user_color: string;
  id: string;
}

export type CompleteRegistrationFormValues = {
  given_name: string;
  family_name: string;
  uuid: string;
  email: string;
}

export type BookingFormValues = {
  name: string;
  guests: string;
  guests_children: string;
  travel_dates: {
    start: string,
    end: string
  },
  message: string;
  user_id: string;
  rooms: string[];
  id: string;
  created_at: number;
  updated_at: number;
}

export type Booking = {
  name: string;
  guests: number;
  guests_children: number | null;
  travel_dates: JsonValue | {
    start: string,
    end: string
  },
  arrival: Date;
  departure: Date;
  message: string | null ;
  user_id: string;
  rooms: string[];
  created_at: bigint | number;
  updated_at: bigint | number;
  user: {
    user_color: string;
  }
  id: string;
  is_canceled: boolean | null ;
}

export type BookingEvent = {
  title: string;
  start: Date;
  end: Date;
} & BookingData


export type SortedBooking = {
  [year: number]: BookingData[];
}

export type InfoPost = {
  id: number;
  date: string;
  date_gmt: string;
  guid: {rendered: string;};
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {rendered: string;};
  content: {rendered: string; protected: boolean;};
  excerpt: {rendered: string; protected: boolean;};
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: { inline_featured_image: boolean, footnotes: string };
  categories: number[];
  tags: number[];
  _links: {
    self: [],
    collection: [],
    about: [],
    author: [],
    replies: [],
    'version-history': [],
    'predecessor-version': [],
    'wp:attachment': [],
    'wp:term': [],
    curies: []
  }
}

export type ImageProps = {
  src: string;
  width: number;
  height: number;
}

export type GalleryProps = {
  id: string;
  name: string;
  images: ImageProps[];
}

export enum Colors {
  "sun",
  "sky",
  "lilac",
  "poppy",
  "jaffa",
  "ivy",
  "water"
}

export const colors = Object.values(Colors);  // = req 2
export type ColorType = keyof typeof Colors;  // = req 1