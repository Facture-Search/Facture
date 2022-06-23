export interface ImageDisplay {
    url: string;
}

export interface EmailDisplay {
    email: string;
    label: string;
}

export interface OpeningTimeDisplay {
    day: number;
    openTime: any;
    closeTime: any;
}

export interface PhoneNoDisplay {
    phoneNo: string;
    label: string;
}

export type SocialPlatformDisplay = "website" | "facebook" | "twitter" | "linkedin" | "instagram" | "youtube";

export interface SocialDisplay {
    platform: SocialPlatformDisplay;
    link: string;
}

export interface LocationDisplay {
    latitude: number;
    longitude: number;
    address: string;
    label: string;
}

export type ColorDisplay =
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose";

export interface ManufacturerDisplay {
    name: string;
    slogan?: string;
    dateEstablished?: any;
    logo: ImageDisplay;
    descriptionShort: string;
    type: string[];
    color: ColorDisplay;
    email: EmailDisplay[];
    phoneNo: PhoneNoDisplay[];
    openingTime: OpeningTimeDisplay[];
    social: SocialDisplay[];
    location: LocationDisplay[];
    descriptionLong: string;
    thumbnail: ImageDisplay;
    display: ImageDisplay[];
    manufacturer: string;
}
