module.exports = {
  name: 'actions',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/actions',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
