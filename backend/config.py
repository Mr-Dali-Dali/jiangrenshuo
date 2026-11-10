# -*- coding: utf-8 -*-
"""配置加载：优先读 backend/.env，其次读进程环境变量。零依赖实现（不引入 python-dotenv）。"""
import os

ENV_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")


def _load_env_file(path):
    env = {}
    try:
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, value = line.split("=", 1)
                env[key.strip()] = value.strip().strip('"').strip("'")
    except OSError:
        pass
    return env


_file_env = _load_env_file(ENV_FILE)


def get(key, default=None):
    """取配置：进程环境变量优先，其次 .env 文件，最后默认值。"""
    return os.environ.get(key, _file_env.get(key, default))
