module.exports = {
  name: 'reference-micro-apps-contacts-app',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/reference/micro-apps/contacts-app',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
