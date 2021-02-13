import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Trump2 extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Trump2, {
      category: category,

      name: 'heavens door trump2',
      aliases: [],
      description: 'Trump stares at provided image',
      usage: 'heavens door trump2 [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door trump2'
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
    const trump = this.modules.heavensdoor.getAssetPath('trump2.png')
    const metadata = await this.sharp(trump).metadata()
    const perspective = await this.modules.heavensdoor.generatePerspective(
      this.filename,
      {
        width: metadata.width,
        height: metadata.height
      },
      {
        tL: { x: 383, y: 131 },
        tR: { x: 687, y: 121 },
        bL: { x: 383, y: 636 },
        bR: { x: 662, y: 644 }
      }
    )
    return this.sharp(trump)
      .composite([{ input: perspective, left: 0, top: 0, blend: 'dest-over' }])
      .toBuffer()
  }
}
