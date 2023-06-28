'use client'
import { setRevalidateHeaders } from 'next/dist/server/send-payload'
import { ChangeEvent, useEffect, useState, useRef } from 'react'

const StopWatch = () => {
  const Status = {
    Running: 'running',
    Pause: 'pause',
    Stop: 'stop',
  }

  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(Status.Stop)
  // 時間のタイプを持つようにする。このタイプはbackendで管理する
  const [selectedCategory, setSelectedCategory] = useState('programmingStudy')
  const [pausedTime, setPausedTime] = useState(0)
  const intervalRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (currentStatus === Status.Running) {
      startTimeRef.current = Date.now() - pausedTime
      intervalRef.current = window.setInterval(() => {
        setTime(Date.now() - startTimeRef.current!)
      }, 1000)
    } else {
      window.clearInterval(intervalRef.current!)
    }

    return () => {
      window.clearInterval(intervalRef.current!)
    }
  }, [currentStatus])

  const handleStart = () => {
    setIsRunning(true)
    setCurrentStatus(Status.Running)
  }

  const handlePause = () => {
    setCurrentStatus(Status.Pause)
    setPausedTime(Date.now() - startTimeRef.current!)
  }

  const handleResume = () => {
    console.log('resume')
    setCurrentStatus(Status.Running)
  }

  const handleStop = () => {
    console.log('stop')
    setCurrentStatus(Status.Stop)
    setTime(0)
    setPausedTime(0)
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600000)
    const minutes = Math.floor((time % 3600000) / 60000)
    const seconds = Math.floor((time % 60000) / 1000)

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  const handleSelectedChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value)
  }

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>
        <label htmlFor='logCategory'>log category: </label>
        <select id='logCategory' value={selectedCategory} onChange={handleSelectedChange}>
          <option value='programmingStudy'>ProgrammingStudy</option>
          <option value='EnglishStudy'>EnglishStudy</option>
          <option value='Shadowing'>Shadowing</option>
        </select>
      </div>
      <div>Time: {formatTime(time)}</div>
      {/* インターバルになにか入っている時のみ、resumeボタンを表示させる */}
      <button onClick={handleStart} disabled={currentStatus != Status.Stop}>
        Start
      </button>
      {currentStatus === 'pause' ? (
        <button onClick={handleResume}>Resume</button>
      ) : (
        <button onClick={handlePause}>Pause</button>
      )}
      <button onClick={handleStop} disabled={currentStatus == Status.Stop}>
        Stop
      </button>
    </div>
  )
}

export default StopWatch
