module.exports = {
  name: 'error-handling',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/error-handling',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
