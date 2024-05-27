the function takes an array of token addresses as a parameter and returns an array of token data objects.

e.g:
```
getTokenData(addresses)
    .then(tokenDataArray => {
        const data = tokenDataArray;
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
```
for now I have only included the data I need for a project, but I will eventually have the function return a lot more data than just the price, fdv & name.