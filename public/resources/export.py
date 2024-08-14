import json
import re

# Define regex pattern for properties to remove
regex_pattern = r'(adm0_a3_.+|fclass_(?!iso$|tlc$).+|filename|min_zoom|min_label|labelrank|name_.{2,3}|scalerank|formal_fr|brk.*|woe.*|mapcolor.*|max_label|tiny|label_x|label_y|iso_a2|iso_a3|fips_10|iso_n3|wikidataid|homepart|un_a3|wb_a2|wb_a3|subunit|su_a3|geou_dif|gdp.*|pop_.*|economy|income_group|featurecla|name_ciawf)$'  # Example pattern: match any property starting with "adm_0_a3_"

pattern = re.compile(regex_pattern)

input_file_path = 'world-map-countries.json'
output_file_path = 'countries.json'


with open(input_file_path, 'r', encoding='utf-8') as input_file:
    topojson_data = json.load(input_file)


def clean_properties(properties):
    return {key: value for key, value in properties.items() if not pattern.match(key)}

properties_list = [clean_properties(feature["properties"]) for feature in topojson_data["features"]]

result = properties_list

with open(output_file_path, 'w', encoding='utf-8') as output_file:
    json.dump(result, output_file, indent=2, ensure_ascii=False)

print(f"Extracted properties saved to {output_file_path}")
