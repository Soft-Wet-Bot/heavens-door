import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Blurple extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Blurple, {
      category: category,

      name: 'heavens door blurple',
      aliases: ['discordify', 'discord'],
      description: 'Blurple an image',
      usage: 'heavens door blurple [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door blurple'
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
    const image = this.gm(this.filename)
      .coalesce()
      .threshold(60, true)
      .out('+level-colors')
      .out('"#7289DA",white')
    return this.modules.heavensdoor.toPng(image)
  }
}
