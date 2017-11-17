import { Slingshot } from 'meteor/edgee:slingshot';

Slingshot.createDirective("imagesUploads", Slingshot.S3Storage, {
  bucket: Meteor.settings.private.S3_BUCKET,
  AWSAccessKeyId: Meteor.settings.private.AWS_ACCESS_KEY_ID,
  AWSSecretAccessKey: Meteor.settings.private.AWS_SECRET_ACCESS_KEY,
  region: Meteor.settings.private.AWS_REGION,

  acl: "public-read",
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024, // 10 MB (use null for unlimited)

  authorize: function () {
    return true;
  },

  key: function (file) {
    //Store file into a directory
    return file.name;
  }
});
