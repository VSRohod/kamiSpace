# reactNativeAulas

## LINKS ÚTEIS
- <a href="https://reactnative.dev/"> REACT NATIVE </a>
- <a href="https://expo.dev/"> EXPO DEV </a>
- <a href="https://github.com/nvm-sh/nvm"> NVM </a>
- <a href="https://nodejs.org/en"> Node Js </a>
- <a href="https://expo.dev/go"> Expo Go </a>

### - Após a configuração do ambiente, vamos para o terminal com Node e começaremos!
### - Selecione a pasta do projeto
### - No terminal insira:
```
  npx create-expo-app --template
```
### - Selecione a opção " Navigation (TypeScript) "
### - Digite o nome da aplicação 
### - Em caso de erros, acione o atalho cntrol + shift + p e busque Developer: reload window
### - Apague a pasta "Apps"
### - Apague a pasta "Fonts" da pasta "Assets"
### - Apague a pasta "Components"
### - Apague a pasta "Constants"
### - ou use npm run reset-project






### - Rode "npm install" caso não tenha as dependências
### - Crie uma pasta chamada "src" e dentro de src crie ums pasta "app"
### - Dentro da pasta "app" crie "index.tsx"
### - No arquivo "index.tsx" insira o código:
```
  import { View , Text } from "react-native"

  export default function Index(){
    return (
      <View>
        <Text> Hello World! </Text>
      </View>
    )
  }
```
 ### - Após isso rode no terminal "npx expo start"
 ### - Para testar as atualizações acrescente como atributo de <Text> "style={{ color: "red", fontSize:24 }}"
 ### - Para css mais otimizado , insira "StyleSheet" nos imports e acrescente após o export:
```
  const styles = StyleSheet.create({
      
  })
```
### - Agora iremos atualizar o código para que as seleções de css sejam feitas no bloco de styles e utilizar um identificador na tag, o código todo ficará exatamente assim:
```
  import { View , Text , StyleSheet } from "react-native"

  export default function Index(){
    return (
      <View>
        <Text style={styles.title}> Hello World! </Text>
      </View>
    )
  }

   const styles = StyleSheet.create({
        title: {
          color : "red",
          fontSize : 24,
        },
    })
```
### - Para mostrar a funcionalidade após as alterações acrescente "fontWeight: "bold""
### - Obs: Flexbox é ativado automaticamente
### - 
### - 
### - 
### - 
### - 
### - 
### - 
### - 
### - 
### - 
### - 
### - 
### - 
### - 
 


