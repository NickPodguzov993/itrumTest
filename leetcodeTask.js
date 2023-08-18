// Это решение я написал сам, работает в редакторе кода но не работает в проверке LeetCode,
// в обсуждении задачи у людей также возникали проблемы по этому поводу
//я нагуглил решение которое удовлетворяет LeetCode, но оно не удовлетворяет редактор кода))
// оно будет разделено строкой комментария


let addTwoNumbers = function(l1, l2) {
    if (l1.length === 0 || l2.length === 0) {
        null
    } else {
        const num1 = l1.reverse().join('')
        const num2 =  l2.reverse().join('')
        const res = Number(num1) + Number(num2)

        return  Array.from(String(res), Number).reverse()
    }
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Это решение LeetCode засчитывает

const l1 = [9,9,9,9,9,9,9]
const l2 = [9,9,9,9]

const addTwoNumbers = function (l1, l2) {
    let head = null;
    let temp = null;
    let carry = 0;
    while (l1 !== null || l2 !== null) {
        let sum = carry;
        if (l1 != null) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2 != null) {
            sum += l2.val;
            l2 = l2.next;
        }
        let node = new ListNode(Math.floor(sum) % 10);
        carry = Math.floor(sum / 10);
        if (temp == null) {
            temp = head = node;
        }
        else {
            temp.next = node;
            temp = temp.next;
        }
    }
    if (carry > 0) {
        temp.next = new ListNode(carry);
    }
    return head;
};

console.log(addTwoNumbers(l1,l2))