import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Radial extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Radial, {
      category: category,

      name: 'heavens door radial',
      aliases: ['radial blur'],
      description: 'Radial blur an image',
      usage: 'heavens door radial [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door radial'
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

  modifyImage() {
    const image = this.gm(this.filename).coalesce().out('-rotational-blur', 10)
    return this.modules.heavensdoor.toPng(image)
  }
}
