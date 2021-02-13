import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Timmy extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Timmy, {
      category: category,

      name: 'heavens door timmy',
      aliases: ['odd', 'turner', 'fop'],
      description: 'Timmy stares at provided image',
      usage: 'heavens door timmy [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door timmy'
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
    const timmy = this.modules.heavensdoor.getAssetPath('timmy.png')
    const metadata = await this.sharp(timmy).metadata()
    const perspective = await this.modules.heavensdoor.generatePerspective(
      this.filename,
      {
        width: metadata.width,
        height: metadata.height
      },
      {
        tL: { x: 162, y: 512 },
        tR: { x: 316, y: 507 },
        bL: { x: 162, y: 732 },
        bR: { x: 315, y: 733 }
      }
    )
    return this.sharp(timmy)
      .composite([{ input: perspective, left: 0, top: 0, blend: 'dest-over' }])
      .toBuffer()
  }
}
