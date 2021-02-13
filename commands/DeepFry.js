import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class DeepFry extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(DeepFry, {
      category: category,

      name: 'heavens door deepfry',
      aliases: [],
      description: 'Deepfry an image',
      usage: 'heavens door deepfry [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door deepfry'
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run(command) {
    try {
      const out = await this.modifyImage()

      await this.send("**Heaven's Door**", {
        files: [
          {
            attachment: out,
            name: `${this.name}.png`
          }
        ]
      })
    } catch (e) {
      this.send(
        'Unknown error occured, notify the creator of the bot if this persists:```js\n' +
        e.stack +
        '```'
      )
    }

    return true
  }

  modifyImage() {
    const image = this.gm(this.filename)
      .colorspace('RGB')
      .out('-brightness-contrast', '30x50')
      .setFormat('jpg')
      .quality(1)
    return this.modules.heavensdoor.toPng(image)
  }
}
