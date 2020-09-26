module.exports = {
  name: 'rules-engine',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/rules-engine',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
