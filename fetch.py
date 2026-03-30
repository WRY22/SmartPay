import requests
import json
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
import logging

# 配置日誌
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def fetch_credit_cards():
    """
    抓取中信銀行信用卡列表數據
    """
    url = "https://www.ctbcbank.com/web/content/twrbo/setting/creditcards.cardlist.json?IIhfvu=1wsT4Kik3xCVvd1PlbDRm6KnpQ6tOKZsCGhoTHBZoqotrhKtvSGKYATXmzo3j9uUQMJMwWxAuwB99ygP4cqfCnwClbJpbKGcWE.PA2lEsPP9A9dfNlN3B7heaDReXK_Ve.GjDZAefe7FH.m4AhSpS0KAOvrlijn5qIeOlEhzPlmTnZXEEnNEDZZt5hNrkqgLqQLqHWfOWpMgC0f_yX6fIMp.bktqGb4G1ACgUU0nCZDPZXcOh3AwxfL67g5HGArp2WbDi7p1lwStbQltLUWwmtaGlp.qU5n9FeDqMe0xo5OVUeqIr9y3aAuoFHkoN5CMuLu9aRct4at39.dY4i8Ajm3zCyKxlJU2cIiUihcEB3ZTDgpDYEwAzXBYcA"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
    
    try:
        print("正在發送請求...")
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # 解析 JSON 響應
        data = response.json()
        print(f"✓ 成功抓取數據，共 {len(data.get('creditCards', []))} 張信用卡")
        
        # 準備輸出數據
        output_data = {
            "fetchTime": datetime.now().isoformat(),
            "totalCards": len(data.get('creditCards', [])),
            "creditCards": data.get('creditCards', [])
        }
        
        # 保存到 JSON 檔案
        output_file = "credit_cards_data.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)
        
        print(f"✓ 數據已保存到 {output_file}")
        logger.info(f"成功抓取並保存 {len(data.get('creditCards', []))} 張信用卡")
        
        return output_data
        
    except requests.exceptions.RequestException as e:
        print(f"✗ 請求失敗: {e}")
        logger.error(f"請求失敗: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"✗ JSON 解析失敗: {e}")
        logger.error(f"JSON 解析失敗: {e}")
        return None

def start_scheduler():
    """
    啟動背景排程器，每小時執行一次抓取任務
    """
    scheduler = BackgroundScheduler()
    
    # 添加每小時執行一次的任務
    scheduler.add_job(
        func=fetch_credit_cards,
        trigger="interval",
        hours=1,
        id='fetch_credit_cards_job',
        name='抓取信用卡數據',
        replace_existing=True
    )
    
    scheduler.start()
    logger.info("✓ 排程器已啟動，將每小時執行一次抓取任務")
    print("✓ 排程器已啟動，將每小時執行一次抓取任務")
    
    # 確保程式關閉時排程器也關閉
    atexit.register(lambda: scheduler.shutdown())
    
    return scheduler

if __name__ == "__main__":
    # 首次執行立即抓取
    print("執行初始抓取...")
    fetch_credit_cards()
    
    # 启动后台排程器
    start_scheduler()
    
    print("按 Ctrl+C 停止排程器")
    
    try:
        # 保持程序運行
        while True:
            pass
    except KeyboardInterrupt:
        logger.info("排程器已停止")
        print("\n✓ 排程器已停止")
