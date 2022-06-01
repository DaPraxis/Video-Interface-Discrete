# used to quickly generate imports/exports for ./assets.js

import os
import json

AUDITORY = './auditory'
VISUAL = './visual'
ENDING = './ending'

exports = {}

with open('assets.js', 'w') as f:
    for path, key in zip([AUDITORY, VISUAL, ENDING], ['auditory', 'visual', 'ending']):
        exports[key] = []
        for _, _, files in os.walk(path):
            for file in files:
                import_name = f"{file[:file.rfind('.')].lower().replace(' ', '')}_{key.upper()}"
                f.write(f"import {import_name} from '{path}/{file}';\n")
                exports[key].append(import_name)
        f.write('\n')

    f.write('export default {\n')
    for key in ['auditory', 'visual', 'ending']:
        f.write(f'  {key}: {{\n')
        for import_name in exports[key]:
            export_name = import_name[:import_name.rfind('_')]
            f.write(f'    {export_name}: {import_name},\n')
        f.write('  },\n')
    f.write('};\n')
    