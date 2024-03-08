const fruitImagesList: string[] = [
    'cam.png',
    'canhvang.png',
    'chanhxanh.png',
    'dau.png',
    'luu.png',
    'tao.png',
];

// Hàm shuffleArray dùng để xáo trộng hình ảnh ngẫu nhiên
function shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        const temp: T = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Nhân đôi vật thể
function duplicateArrayElements<T>(array: T[]): T[] {
    return array.flatMap((item) => [item, item]);
}

function createCardElements(imageUrls: string[]): void {
    const container: HTMLElement | null = document.getElementById('grid');
    if (container) {
        const duplicatedImages: string[] = duplicateArrayElements(imageUrls);
        shuffleArray(duplicatedImages);
        let htmlContent: string = '';
        duplicatedImages.forEach((imageUrl) => {
            const cardHtml: string = `
                <div class="col-md-2">
                    <div class="card" onclick="toggleImageSize(this)">
                        <img src="../../../assets/images/${imageUrl}" alt="Fruit" width="120" height="120" class="card-img-top hidden">
                    </div>
                </div>
            `;
            htmlContent += cardHtml;
        });
        container.innerHTML = htmlContent;
    }
}

// Function to toggle image visibility
function toggleImageSize(card: HTMLElement): void {
    const img: HTMLElement | null = card.querySelector('.card-img-top');
    if (img && img.classList.contains('hidden')) {
        img.classList.remove('hidden');
        setTimeout(() => {
            if (img) img.style.opacity = '1'; // thay đổi opacity của ảnh thành 1 sau 10ms để kích hoạt transition
        }, 10);
    } else if (img) {
        img.style.opacity = '0'; // thay đổi opacity của ảnh thành 0 để ẩn đi
        setTimeout(() => {
            img.classList.add('hidden'); // sau khi opacity của ảnh thành 0, thêm lớp hidden để ẩn ảnh
        }, 10); // thời gian delay 0.5s để chờ transition kết thúc
    }
}

createCardElements(fruitImagesList);
