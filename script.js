// async function run(urls) {
//     const results = await Promise.allSettled(
//         urls.map(url =>
//             fetch(url).then(res => {
//                 if (!res.ok) {
//                     throw new Error(`Url issue: ${url}`);
//                 }
//                 return res.json();
//             })
//         )
//     );

//     results.forEach(r => {
//         if (r.status === "fulfilled") {
//             console.log(r.value.title);
//         } else {
//             console.error("Failed:", r.reason.message);
//         }
//     });
// }
// run(['https://jsonplaceholder.typicode.com/todos/fasdfas',
//      'https://jsonplaceholder.typicode.com/todos/2',
//      'https://jsonplaceholder.typicode.com/todos/3',
//      'https://jsonplaceholder.typicode.com/todos/4',
//      'https://jsonplaceholder.typicode.com/todos/5',
//      'https://jsonplaceholder.typicode.com/todos/6',])




// async function run(urls) {
//     const results = await Promise.all(
//         urls.map(url=>fetch(url))
//     )
//     // console.log(results)
//     results.forEach(async result=>console.log((await result)))
// }

// run(['https://jsonplaceholder.typicode.com/todos/1',
//     //  'https://jsonplaceholder.typicode.com/todos/2',
//     //  'https://jsonplaceholder.typicode.com/todos/3',
//     //  'https://jsonplaceholder.typicode.com/todos/4',
//     //  'https://jsonplaceholder.typicode.com/todos/5',
//     //  'https://jsonplaceholder.typicode.com/todos/6',
//     ])




// async function sendData() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     title: "hello",
//     body: "world",
//     userId: 1
//   })
//   });

//   const data = await response.json();
//   console.log(response);
// }

// sendData().then(()=>console.log(`=============
//     done
//     ================`)).catch(()=>console.log('error'))




// async function load() {
//   const res = await fetch(url);
//     if (!res.ok){
//         throw new Error("The response is not as expected")
//     }
//       const data = await res.json();
//     console.log(data);
// }
