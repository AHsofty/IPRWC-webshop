export class Image {
  constructor(
      public id: string,
      public productId: string,
      public imageName: string,
      public imageFileName: string,

      public imageBase64?: string,
      ) {

  }
}
