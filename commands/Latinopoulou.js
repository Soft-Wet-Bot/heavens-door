import HeavensDoor from "../structures/commands/HeavensDoor.js";

export default class Latinopoulou extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args);

    this.register(Latinopoulou, {
      category: category,

      name: "heavens door latinopoulou",
      aliases: [],
      description: "Latinopoulou shows you an image",
      usage: "heavens door latinopoulou [image resolvable]",
      params: [
        {
          name: "image resolvable",
          description: "A link, a mentioned user or url to an image.",
          type: "string",
          default: "Takes the user profile picture",
        },
      ],
      example: "heavens door latinopoulou",
    });
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run() {
    try {
      const out = await this.modifyImage();

      await this.send("**Heaven's Door**", {
        files: [
          {
            attachment: out,
            name: `${this.name}.png`,
          },
        ],
      });
    } catch (e) {
      this.send(
        "Unknown error occured, notify the creator of the bot if this persists:\n" +
          e.stack
      );
    }

    return true;
  }

  async modifyImage() {
    const latinopoulou =
      this.modules.heavensdoor.getAssetPath("latinopoulou.png");
    const metadata = await this.sharp(latinopoulou).metadata();
    const perspective = await this.modules.heavensdoor.generatePerspective(
      this.filename,
      {
        width: metadata.width,
        height: metadata.height,
      },
      {
        tL: { x: 174, y: 722 },
        tR: { x: 671, y: 731 },
        bL: { x: 176, y: 1242 },
        bR: { x: 682, y: 1242 },
      }
    );
    return this.sharp(latinopoulou)
      .composite([{ input: perspective, left: 0, top: 0, blend: "dest-over" }])
      .toBuffer();
  }
}
