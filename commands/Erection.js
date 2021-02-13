import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Erection extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Erection, {
      category: category,

      name: 'heavens door erection',
      aliases: [],
      description: 'Kira gets an erection looking at an image',
      usage: 'heavens door erection [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door erection'
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
    const hand = this.modules.heavensdoor.getAssetPath('hand.png')
    const metadata = await this.sharp(hand).metadata()
    const perspective = await this.modules.heavensdoor.generatePerspective(
      this.filename,
      {
        width: metadata.width,
        height: metadata.height
      },
      {
        tL: { x: 918, y: 98 },
        tR: { x: 1179, y: 169 },
        bL: { x: 775, y: 480 },
        bR: { x: 1031, y: 574 }
      }
    )
    return this.sharp(hand)
      .composite([{ input: perspective, left: 0, top: 0, blend: 'dest-over' }])
      .toBuffer()
  }
}
