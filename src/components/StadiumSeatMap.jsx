// @ts-ignore;
import React from 'react';

const StadiumSeatMap = ({
  selectedSeats,
  onSeatSelect,
  availableSeats,
  maxSeats = 100
}) => {
  // 球场座位布局 - 模拟真实的球场形状
  const rows = 10;
  const seatsPerRow = 10;

  // 创建球场形状的座位布局
  const getSeatLayout = () => {
    const layout = [];

    // 创建弧形球场布局
    for (let row = 0; row < rows; row++) {
      const rowSeats = [];
      const seatsInRow = Math.min(seatsPerRow, Math.floor(seatsPerRow * (0.6 + row * 0.04))); // 弧形布局
      const offset = Math.floor((seatsPerRow - seatsInRow) / 2);
      for (let seat = 0; seat < seatsPerRow; seat++) {
        const seatNumber = row * seatsPerRow + seat + 1;
        const isAvailable = seatNumber <= availableSeats && seat >= offset && seat < offset + seatsInRow;
        const isSelected = selectedSeats.includes(seatNumber);
        rowSeats.push({
          seatNumber,
          isAvailable,
          isSelected,
          isEmpty: seat < offset || seat >= offset + seatsInRow
        });
      }
      layout.push(rowSeats);
    }
    return layout;
  };
  const seatLayout = getSeatLayout();
  return <div className="stadium-seat-map">
      {/* 球场中心 */}
      <div className="text-center mb-8">
        <div className="w-48 h-24 bg-green-500 mx-auto mb-4 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">球场中心</span>
        </div>
        <p className="text-sm text-gray-600">比赛场地</p>
      </div>

      {/* 座位区域 */}
      <div className="space-y-2">
        {seatLayout.map((row, rowIndex) => <div key={rowIndex} className="flex justify-center space-x-1">
            {row.map(seat => {
          if (seat.isEmpty) {
            return <div key={seat.seatNumber} className="w-8 h-8" />; // 空位占位
          }
          return <button key={seat.seatNumber} className={`w-8 h-8 rounded text-xs font-medium transition-all duration-200 transform hover:scale-110 ${seat.isSelected ? 'bg-blue-600 text-white shadow-lg' : seat.isAvailable ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300' : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'}`} onClick={() => seat.isAvailable && onSeatSelect(seat.seatNumber)} disabled={!seat.isAvailable} title={`座位 ${seat.seatNumber}`}>
                  {seat.seatNumber}
                </button>;
        })}
          </div>)}
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