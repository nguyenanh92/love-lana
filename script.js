// Ngày bắt đầu và các ngày đặc biệt
const LOVE_START_DATE = new Date('2023-12-16');
const SPECIAL_DATES = [
    { name: 'Anh Birthday', date: '1998-01-03' },
    { name: 'Lana Birthday', date: '1999-02-07' }
];

// Các phần tử DOM
const daysElement = document.getElementById('days');
const startDateElement = document.getElementById('start-date');
const specialDaysContainer = document.querySelector('.special-days');

// Format date to YYYY/MM/DD
function formatDate(date) {
    return date.toISOString().split('T')[0].replace(/-/g, '/');
}

// Tính số ngày giữa hai ngày
function calculateDaysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1 - date2) / oneDay));
}

// Tính ngày đến sinh nhật tiếp theo
function calculateDaysUntilNextBirthday(birthdate) {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Tạo ngày sinh nhật trong năm nay
    const birthdateThisYear = new Date(birthdate);
    birthdateThisYear.setFullYear(currentYear);
    
    // Tạo ngày sinh nhật năm sau
    const birthdateNextYear = new Date(birthdate);
    birthdateNextYear.setFullYear(currentYear + 1);
    
    // So sánh với ngày hiện tại để xác định sinh nhật gần nhất
    const nextBirthday = birthdateThisYear > today ? birthdateThisYear : birthdateNextYear;
    
    // Tính số ngày còn lại
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.ceil((nextBirthday - today) / oneDay);
}

// Cập nhật bộ đếm ngày yêu
function updateMainCounter() {
    const today = new Date();
    const daysDiff = calculateDaysBetween(today, LOVE_START_DATE);
    daysElement.textContent = daysDiff;
    startDateElement.textContent = formatDate(LOVE_START_DATE);
}

// Cập nhật các ngày đặc biệt
function updateSpecialDays() {
    SPECIAL_DATES.forEach(event => {
        const daysUntil = calculateDaysUntilNextBirthday(event.date);
        
        const specialDayElement = document.querySelector(`[data-event="${event.name}"]`) ||
            createSpecialDayElement(event);
            
        const daysLeftElement = specialDayElement.querySelector('.days-left');
        daysLeftElement.textContent = daysUntil === 0 ? 'Today!' : 
                                    daysUntil === 1 ? 'Tomorrow!' :
                                    `${daysUntil} days left`;
    });
}

// Tạo phần tử HTML cho ngày đặc biệt
function createSpecialDayElement(event) {
    const div = document.createElement('div');
    div.className = 'special-day';
    div.setAttribute('data-event', event.name);
    
    const eventDate = new Date(event.date);
    const formattedDate = `${eventDate.getDate()}/${eventDate.getMonth() + 1}`;
    
    div.innerHTML = `
        <div class="event-info">
            <span class="event-name">${event.name}</span>
            <span class="event-date">${formattedDate}</span>
        </div>
        <div class="days-left"></div>
    `;
    
    specialDaysContainer.appendChild(div);
    return div;
}

// Thêm sự kiện cho nút thêm
document.querySelector('.add-event').addEventListener('click', () => {
    // Implement add event functionality here
    alert('Coming soon: Add your special day!');
});

// Khởi tạo
function initialize() {
    updateMainCounter();
    updateSpecialDays();
}

// Cập nhật mỗi giờ
initialize();
setInterval(initialize, 1000 * 60 * 60); 