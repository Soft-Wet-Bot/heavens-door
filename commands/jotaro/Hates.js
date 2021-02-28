import HeavensDoor from '../../structures/commands/HeavensDoor.js'

export default class JotaroHates extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(JotaroHates, {
      category: category,

      name: 'heavens door hates',
      aliases: [],
      description: 'Jotaro hates an image',
      usage: 'heavens door jotaro hates [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door jotaro hates'
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
    const jotaro = this.modules.heavensdoor.getAssetPath('jotaropic.png')
    const metadata = await this.sharp(jotaro).metadata()
    const perspective = await this.modules.heavensdoor.generatePerspective(
      this.filename,
      {
        width: metadata.width,
        height: metadata.height
      },
      {
        tL: { x: 89, y: 315 },
        tR: { x: 391, y: 315 },
        bL: { x: 10, y: 606 },
        bR: { x: 479, y: 606 }
      }
    )
    return this.sharp(jotaro)
      .composite([{ input: perspective, left: 0, top: 0, blend: 'dest-over' }])
      .toBuffer()
  }
}
