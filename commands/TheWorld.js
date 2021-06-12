import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class TheWorld extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(TheWorld, {
      category: category,

      name: 'heavens door the world',
      aliases: ['za warudo'],
      description: 'Explodes & Inverts an image',
      usage: 'heavens door the world [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door the world'
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
    const invertedImage = this.sharp(this.filename).negate()
    const image = this.gm(invertedImage).implode([-2]).strip()
    return this.modules.heavensdoor.toPng(image)
  }
}
