export function toasty(msg, color = 'green'){

    const div = document.createElement('div')
    div.classList = 'toast'
    
        div.id = 'toasty'
        const paragraph = document.createElement('p')
            paragraph.style.color = color
            paragraph.innerText = msg
    div.appendChild(paragraph)

    setTimeout(() => {
        div.remove()
    }, 3000);

    return div
}