import json
import os
from threading import Lock


class DataLoader:
    _instance = None
    _lock = Lock()
    _data = None
    _is_loaded = False
    
    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super(DataLoader, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if not self._is_loaded:
            self._load_data()
    
    def _load_data(self):
        try:
            current_dir = os.path.dirname(os.path.abspath(__file__))
            data_path = os.path.join(current_dir, '..', 'DB', 'data.json')
            
            with open(data_path, 'r', encoding='utf-8') as f:
                self._data = json.load(f)
            
            self._is_loaded = True
            print(f"[DataLoader] Data loaded successfully from: {data_path}")
            
        except FileNotFoundError:
            raise FileNotFoundError(f"Could not find data.json file in expected path")
        except json.JSONDecodeError as e:
            raise ValueError(f"Error parsing JSON file: {e}")
        except Exception as e:
            raise Exception(f"Unexpected error loading data: {e}")
    
    def get_data(self):
        if not self._is_loaded:
            self._load_data()
        return self._data
    
    def get_intents(self):
        data = self.get_data()
        return data.get('intents', [])
    
    def get_intent_by_tag(self, tag):
        intents = self.get_intents()
        for intent in intents:
            if intent.get('tag') == tag:
                return intent
        return None
    
    def get_all_tags(self):
        intents = self.get_intents()
        return [intent.get('tag') for intent in intents if intent.get('tag')]
    
    def get_all_patterns(self):
        patterns = []
        intents = self.get_intents()
        for intent in intents:
            patterns.extend(intent.get('patterns', []))
        return patterns
    
    def reload_data(self):
        with self._lock:
            self._is_loaded = False
            self._load_data()
    
    def is_loaded(self):
        return self._is_loaded


def get_data_loader():
    return DataLoader()


def get_intents_data():
    return get_data_loader().get_data()