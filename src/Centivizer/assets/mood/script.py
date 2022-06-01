# used to quickly generate imports/exports for ./assets.js

import os
import json

FEARFUL = [
    './faces/middle age female fearful',
    './faces/middle age male fearful', 
    './faces/young female fearful',
    './faces/young male fearful'
]

HAPPY = [
    './faces/middle age female happy',
    './faces/middle age male happy',
    './faces/young female happy', 
    './faces/young male happy'
]

NEUTRAL = [
    './faces/middle age female neutral', 
    './faces/middle age male neutral',
    './faces/young female neutral',
    './faces/young male neutral'
]

exports = {}

with open('assets.js', 'w') as f:
    for paths, key in zip([FEARFUL, HAPPY, NEUTRAL], ['fearful', 'happy', 'neutral']):
        exports[key] = []
        for path in paths:
            for _, _, files in os.walk(path):
                for file in files:
                    import_name = f"{file[:file.rfind('.')].lower().replace(' ', '')}_{key.upper()}"
                    f.write(f"import _{import_name} from '{path}/{file}';\n")
                    exports[key].append(import_name)
            f.write('\n')

    f.write('export default {\n')
    for key in ['fearful', 'happy', 'neutral']:
        for import_name in exports[key]:
            export_name = import_name[:import_name.rfind('_')]
            f.write(f'  _{import_name}: _{import_name},\n')
    f.write('};\n')
    