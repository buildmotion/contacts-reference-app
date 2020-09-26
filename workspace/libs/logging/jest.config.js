module.exports = {
  name: 'logging',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/logging',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
