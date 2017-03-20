var Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command({
  name: "foo",
  desc: "does foo things",
  fn: (argv, context) => {
    // This output will be redirected to your app's onReply function
    return '``` foo test```';
  },
  args: [
    {
      name: 'testarg',
      desc: 'A test argument',
      type: 'string',
      required: false,
      default: 'testarg isn\'t defined'
    }
  ],
  flags: [
    {
      name: 'testflag',
      desc: 'A test flag',
      alias: 't',
      type: 'boolean',
      default: false
    }
  ]
});
