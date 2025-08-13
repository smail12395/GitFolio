document.querySelector('input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault(); 
      const form = document.querySelector(".form");
      const content = document.querySelector(".content");
      const inputValue = document.querySelector('input').value;
      const notFound = document.querySelector(".not-found");
      console.log(inputValue);
      fetch(`https://api.github.com/users/${inputValue}`).then(result =>{
        if (!result.ok) {
          throw new Error('User not found');
        }
        return result.json();
      }).then( data => {
         console.log(data)
         const avatar = document.getElementById("avatar")
         avatar.src = data.avatar_url;
         const divName = document.getElementById("div-name");
         const USERNAME = document.getElementById("USERNAME");
         const createdAt = document.getElementById("created-at");
         const nuOfRepositories = document.querySelector(".number-respositories");
         const nuOfFolowers = document.querySelector(".number-folowers");
         const nuOfFolowing = document.querySelector(".number-folowing");
         const statisticLanguages = document.querySelector(".statistic_languages");

         divName.textContent = `${data.name}`;
         USERNAME.textContent = `@${data.login}`;
         USERNAME.onclick =()=>{
          window.open(data.html_url , "_blank")
         }
         let textCreatedAt = data.created_at.split("-");
         const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
         createdAt.textContent = `Joined ${textCreatedAt[0]} ${months[parseInt(textCreatedAt[1]) -1]} ${textCreatedAt[2][0]}${textCreatedAt[2][1]}`;
         nuOfRepositories.textContent = `${data.public_repos}`;
         nuOfFolowers.textContent = `${data.followers}`;
         nuOfFolowing.textContent = `${data.following}`;
         fetch(data.repos_url).then((res) => {
               return res.json();
              }).then(repoData =>{
               console.log(repoData);
               let languages = [];

               for (let i = 0; i < repoData.length; i++) {
                 let lang = repoData[i].language;
                 if (!lang) continue; // تجاهل null أو undefined               

                 let found = false;
                 for (let j = 0; j < languages.length; j++) {
                   if (languages[j][0] === lang) {
                     languages[j][1] += 1; // زِد العَدّ
                     found = true;
                     break;
                   }
                 }               

                 if (!found) {
                   languages.push([lang, 1]); // أضف لغة جديدة
                 }
                }
                  const gradients = [
                    "gradient-teal",
                    "gradient-emerald",
                    "gradient-amber",
                    "gradient-rose",
                    "gradient-indigo",
                    "gradient-orange",
                    "gradient-yellow",
                    "gradient-cyan",
                    "gradient-purpol",
                    "gradient-white"
                  ];
               
               
               console.log(languages)
               totalLanguagesTimes = 0
               for (let j = 0; j < languages.length; j++){
                totalLanguagesTimes = parseInt(languages[j][1] + totalLanguagesTimes);
               }
               console.log(totalLanguagesTimes)
               const parentDivStatistic = document.querySelector(".parent-div-statistic")
               for (let j = 0; j < languages.length; j++){
                const parentDivBar = document.createElement("div");
                parentDivBar.className = "flex justify-between items-center space-x-2";
                const languageNameParagraph = document.createElement("p");
                languageNameParagraph.className = "w-[20%] p-2 m-1 break-words";
                languageNameParagraph.textContent = languages[j][0]
                const divStatisticBar = document.createElement("div");
                divStatisticBar.className = "w-full h-6";
                const VolumeStatisticBar = document.createElement('div');
                VolumeStatisticBar.className = "flex justify-start h-full rounded-br-xl rounded-tr-xl";
                VolumeStatisticBar.style.width = parseInt(languages[j][1] * 100 / totalLanguagesTimes) + "%";
                const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
                VolumeStatisticBar.classList.add(randomGradient);
                console.log(parseInt(parseInt(languages[j][1])*100/totalLanguagesTimes))
                divStatisticBar.appendChild(VolumeStatisticBar);
                parentDivBar.appendChild(languageNameParagraph);
                parentDivBar.appendChild(divStatisticBar);
                parentDivStatistic.appendChild(parentDivBar)
               }



              }).catch(error =>{console.error(error)})
         content.classList.remove("hidden")
        }).catch(error => {
           console.error('Error caught:', error);
           notFound.classList.remove("hidden");
           content.classList.add("hidden");
         }).finally(
            () =>{
              form.classList.add("hidden");
            }
        )
      
      
  }
});