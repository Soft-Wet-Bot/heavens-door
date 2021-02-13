import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Jerma extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Jerma, {
      category: category,

      name: 'heavens door jerma',
      aliases: [],
      description: "Jerma doesn't like provided image",
      usage: 'heavens door jerma [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door jerma'
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
        'Unknown error occured, notify the creator of the bot if this persists:\n' +
        e.stack
      )
    }

    return true
  }

  async modifyImage() {
    const jerma = this.modules.heavensdoor.getAssetPath('jerma.png')
    const metadata = await this.sharp(jerma).metadata()
    const perspective = await this.modules.heavensdoor.generatePerspective(
      this.filename,
      {
        width: metadata.width,
        height: metadata.height
      },
      {
        tL: { x: 689, y: 275 },
        tR: { x: 1060, y: 280 },
        bL: { x: 689, y: 543 },
        bR: { x: 1045, y: 562 }
      }
    )
    return this.sharp(jerma)
      .composite([{ input: perspective, left: 0, top: 0, blend: 'dest-over' }])
      .toBuffer()
  }
}
