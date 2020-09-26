module.exports = {
  name: 'http-service',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/http-service',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
