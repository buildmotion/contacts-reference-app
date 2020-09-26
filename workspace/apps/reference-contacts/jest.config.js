module.exports = {
  name: 'reference-contacts',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/reference-contacts',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
