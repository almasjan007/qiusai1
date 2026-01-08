// @ts-ignore;
import React from 'react';

const StadiumSeatMap = ({
  selectedSeats,
  onSeatSelect,
  availableSeats,
  maxSeats = 100
}) => {
  // 球场四边座位布局
  const createStadiumLayout = () => {
    const layout = {
      north: [],
      // 北看台
      south: [],
      // 南看台
      east: [],
      // 东看台
      west: [] // 西看台
    };

    // 每个看台的座位数
    const seatsPerSide = Math.floor(availableSeats / 4);

    // 北看台 (上方)
    for (let row = 0; row < 5; row++) {
      const rowSeats = [];
      const seatsInRow = Math.max(3, Math.floor(seatsPerSide / 5));
      for (let seat = 0; seat < seatsInRow; seat++) {
        const seatNumber = row * seatsInRow + seat + 1;
        const isAvailable = seatNumber <= seatsPerSide;
        const isSelected = selectedSeats.includes(seatNumber);
        rowSeats.push({
          seatNumber,
          isAvailable,
          isSelected
        });
      }
      layout.north.push(rowSeats);
    }

    // 南看台 (下方)
    for (let row = 0; row < 5; row++) {
      const rowSeats = [];
      const seatsInRow = Math.max(3, Math.floor(seatsPerSide / 5));
      for (let seat = 0; seat < seatsInRow; seat++) {
        const seatNumber = seatsPerSide + row * seatsInRow + seat + 1;
        const isAvailable = seatNumber <= seatsPerSide * 2;
        const isSelected = selectedSeats.includes(seatNumber);
        rowSeats.push({
          seatNumber,
          isAvailable,
          isSelected
        });
      }
      layout.south.push(rowSeats);
    }

    // 东看台 (右侧)
    for (let row = 0; row < 4; row++) {
      const rowSeats = [];
      const seatsInRow = Math.max(2, Math.floor(seatsPerSide / 4));
      for (let seat = 0; seat < seatsInRow; seat++) {
        const seatNumber = seatsPerSide * 2 + row * seatsInRow + seat + 1;
        const isAvailable = seatNumber <= seatsPerSide * 3;
        const isSelected = selectedSeats.includes(seatNumber);
        rowSeats.push({
          seatNumber,
          isAvailable,
          isSelected
        });
      }
      layout.east.push(rowSeats);
    }

    // 西看台 (左侧)
    for (let row = 0; row < 4; row++) {
      const rowSeats = [];
      const seatsInRow = Math.max(2, Math.floor(seatsPerSide / 4));
      for (let seat = 0; seat < seatsInRow; seat++) {
        const seatNumber = seatsPerSide * 3 + row * seatsInRow + seat + 1;
        const isAvailable = seatNumber <= availableSeats;
        const isSelected = selectedSeats.includes(seatNumber);
        rowSeats.push({
          seatNumber,
          isAvailable,
          isSelected
        });
      }
      layout.west.push(rowSeats);
    }
    return layout;
  };
  const stadiumLayout = createStadiumLayout();

  // 渲染单个座位
  const renderSeat = seat => <button key={seat.seatNumber} className={`w-8 h-8 rounded text-xs font-medium transition-all duration-200 transform hover:scale-110 ${seat.isSelected ? 'bg-blue-600 text-white shadow-lg' : seat.isAvailable ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300' : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'}`} onClick={() => seat.isAvailable && onSeatSelect(seat.seatNumber)} disabled={!seat.isAvailable} title={`座位 ${seat.seatNumber}`}>
      {seat.seatNumber}
    </button>;
  return <div className="stadium-seat-map max-w-4xl mx-auto">
      {/* 球场布局标题 */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">球场座位图</h3>
        <p className="text-sm text-gray-600">请选择您喜欢的座位区域</p>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        {/* 左侧：西看台 */}
        <div className="space-y-1">
          <div className="text-center text-sm font-medium text-gray-700 mb-2">西看台</div>
          {stadiumLayout.west.map((row, rowIndex) => <div key={`west-${rowIndex}`} className="flex justify-center space-x-1">
              {row.map(renderSeat)}
            </div>)}
        </div>

        {/* 中间：球场和南北看台 */}
        <div className="space-y-4">
          {/* 北看台 */}
          <div className="space-y-1">
            <div className="text-center text-sm font-medium text-gray-700 mb-2">北看台</div>
            {stadiumLayout.north.map((row, rowIndex) => <div key={`north-${rowIndex}`} className="flex justify-center space-x-1">
                {row.map(renderSeat)}
              </div>)}
          </div>

          {/* 球场中心 */}
          <div className="text-center">
            <div className="w-full h-20 bg-green-500 mx-auto rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">比赛场地</span>
            </div>
          </div>

          {/* 南看台 */}
          <div className="space-y-1">
            <div className="text-center text-sm font-medium text-gray-700 mb-2">南看台</div>
            {stadiumLayout.south.map((row, rowIndex) => <div key={`south-${rowIndex}`} className="flex justify-center space-x-1">
                {row.map(renderSeat)}
              </div>)}
          </div>
        </div>

        {/* 右侧：东看台 */}
        <div className="space-y-1">
          <div className="text-center text-sm font-medium text-gray-700 mb-2">东看台</div>
          {stadiumLayout.east.map((row, rowIndex) => <div key={`east-${rowIndex}`} className="flex justify-center space-x-1">
              {row.map(renderSeat)}
            </div>)}
        </div>
      </div>

      {/* 座位图例 */}
      <div className="flex justify-center space-x-6 mt-8 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
          <span>可选座位</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
          <span>已选座位</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded mr-2"></div>
          <span>已售座位</span>
        </div>
      </div>
    </div>;
};
export default StadiumSeatMap;