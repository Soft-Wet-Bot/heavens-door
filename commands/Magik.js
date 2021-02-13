import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Magik extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Magik, {
      category: category,

      name: 'heavens door magik',
      aliases: [],
      description: 'Magiks an image',
      usage: 'heavens door magik [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door magik'
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run(command) {
    try {
      const processMessage = await this.textChannel.send(
        '<a:loading:393852367751086090> This may take a while... <a:loading:393852367751086090>'
      )
      const out = await this.modifyImage()

      await this.send("**Heaven's Door**", {
        files: [
          {
            attachment: out,
            name: `${this.name}.png`
          }
        ]
      })

      processMessage.delete()
    } catch (e) {
      this.send(
        'Unknown error occured, notify the creator of the bot if this persists:\n' +
        e.stack
      )
    }

    return true
  }

  modifyImage() {
    const image = this.gm(this.filename)
    image.out('-resize').out('x256')
    image.out('-liquid-rescale').out('180%')
    image.out('-liquid-rescale').out('60%')

    return this.modules.heavensdoor.toPng(image)
  }
}
