import time
import json
import os
from datetime import datetime
import pygetwindow as gw
import pyautogui
import sounddevice as sd

# Путь к файлу JSON
FILE_PATH = "screen_time.json"

# Переменные для отслеживания активности
last_cursor_pos = pyautogui.position()
inactive_time = 0
update_interval = 5
inactive_limit = 30

# Приложения, которые можно отслеживать полностью
ALLOWED_APPS = ["Spotify", "Visual Studio Code", "Discord", "Obsidian", "Brave", "Telegram", "ChatGPT"]

# Расширения для видео или музыки
VIDEO_APPS = ["YouTube", "VLC", "Spotify", "Netflix", "Twitch"]

# Файл для логирования неизвестных приложений
UNKNOWN_APPS_LOG = "unknown_apps.log"

def is_cursor_active():
    global last_cursor_pos, inactive_time
    current_pos = pyautogui.position()
    if current_pos == last_cursor_pos:
        inactive_time += update_interval
    else:
        inactive_time = 0
        last_cursor_pos = current_pos
    return inactive_time < inactive_limit

def is_audio_active():
    audio = sd.rec(int(0.5 * 44100), samplerate=44100, channels=1, dtype='int16')
    sd.wait()
    return max(audio) > 1000

def get_clean_app_name(title):
    # Пытаемся найти полное совпадение с известными приложениями
    for app in ALLOWED_APPS:
        if app.lower() in title.lower():
            return app
    # Проверка для видео и музыки
    for video in VIDEO_APPS:
        if video.lower() in title.lower():
            return title  # Для видео оставляем полное название
    # Логирование неизвестных приложений
    log_unknown_app(title)
    return "Unknown"

def log_unknown_app(title):
    # Логируем неизвестные приложения
    with open(UNKNOWN_APPS_LOG, "a", encoding="utf-8") as log_file:
        log_file.write(f"{datetime.now()} - Unknown App: {title}\n")

def update_json():
    active_window = gw.getActiveWindow()
    if active_window:
        app_name = get_clean_app_name(active_window.title)
    else:
        app_name = "Unknown"
    
    today = datetime.now().strftime("%Y.%m.%d")
    
    if os.path.exists(FILE_PATH) and os.path.getsize(FILE_PATH) > 0:
        with open(FILE_PATH, "r", encoding="utf-8") as file:
            try:
                data = json.load(file)
            except json.JSONDecodeError:
                data = {}  # Если файл повреждён, сбрасываем
    else:
        data = {}  # Если файла нет или он пуст
    
    if today not in data:
        data[today] = {}
    
    if app_name in data[today]:
        data[today][app_name] += update_interval
    else:
        data[today][app_name] = update_interval
    
    with open(FILE_PATH, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

while True:
    if is_cursor_active() or is_audio_active():
        update_json()
    time.sleep(update_interval)
