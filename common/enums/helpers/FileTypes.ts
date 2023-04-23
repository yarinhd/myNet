export enum FileTypes {
  IMAGE = "img",
  AUDIO = "audio",
  VIDEO = "video",
  PDF = "pdf",
}

export const getContainerNameByFileType = (fileType: FileTypes) => {
  switch (fileType) {
    case FileTypes.IMAGE:
      return "image-container";
    case FileTypes.AUDIO:
      return "audio-container";
    case FileTypes.VIDEO:
      return "video-container";
    case FileTypes.PDF:
      return "pdf-container";
    default:
      return "other-container";
  }
};

export const getMimeTypeByFileType = (fileType: FileTypes) => {
  switch (fileType) {
    case FileTypes.IMAGE:
      return ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
    case FileTypes.AUDIO:
      return ["audio/mpeg", "audio/x-wav"];
    case FileTypes.VIDEO:
      return ["video/mp4", "video/x-msvideo", "video/x-ms-wmv", "image/gif"];
    case FileTypes.PDF:
      return ["application/pdf"];
    default:
      return [];
  }
};

export const getFileSizeByFileType = (fileType: FileTypes) => {
  const MB = 1024 * 1024;
  switch (fileType) {
    case FileTypes.IMAGE:
      return 2 * MB;
    case FileTypes.AUDIO:
      return 10 * MB;
    case FileTypes.VIDEO:
      return 20 * MB;
    case FileTypes.PDF:
      return 10 * MB;
    default:
      return MB;
  }
};
