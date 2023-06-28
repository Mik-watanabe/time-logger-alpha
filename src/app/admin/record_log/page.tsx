import StopWatch from '@/components/StopWatch'
import { timeLogApi } from '@/lib/api/timelog'

async function getUser() {
  const res = await timeLogApi.getUser(1)
  return res.data
}

const RecordLog = async () => {
  const userData = getUser()
  const [user] = await Promise.all([userData])

  return (
    <div>
      <StopWatch />

      {/* stopが押されたら、stopの内容がの内容が保存されるようにする */}
      {/* 下に今日の分だけ表示されるようにする */}
    </div>
  )
}

export default RecordLog
