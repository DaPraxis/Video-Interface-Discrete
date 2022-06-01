# used to quickly generate assets.js

import os
import json

PRIMES = './primes'
ITR = './ITR'
ITU = './ITU'
OTR = './OTR'
OTU = './OTU'

exports = {}

with open('assets.js', 'w') as f:
    for path, key in zip([PRIMES, ITR, ITU, OTR, OTU], ['prime', 'ITR', 'ITU', 'OTR', 'OTU']):
        exports[key] = []
        for _, _, files in os.walk(path):
            for file in files:
                import_name = file[:file.rfind('.')].replace('.', '_')
                f.write(f"import {import_name} from '{path}/{file}';\n")
                exports[key].append(import_name)
        f.write('\n')

    f.write('export default {\n  prime: {\n')
    for import_name in exports['prime']:
        export_name = import_name[:import_name.rfind('_')]
        f.write(f'    {export_name}: {import_name},\n')
    f.write('  },\n')

    f.write('  target: {\n')
    for key in ['ITR', 'ITU', 'OTR', 'OTU']:
        f.write(f'    {key}: {{\n')
        for import_name in exports[key]:
            name = import_name[:import_name.rfind('_')]
            f.write(f'      {name}: {import_name},\n')
        f.write('    },\n')
    f.write('  },\n};\n')
