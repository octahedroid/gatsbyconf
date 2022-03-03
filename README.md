# GatsbyConf - Decoupling Drupal Using Gatsby: A Crash Course workshop


## 1 - Get the code on your local machine

Use git to clone the code repository

```
git clone git@github.com:octahedroid/gatsbyconf.git 
or 
git clone https://github.com/octahedroid/gatsbyconf.git

cd gatsbyconf
``` 

Install dependencies
```
yarn 
```

Start Gatsby on develop mode
```
yarn develop
```

## 2.A - Rendering field data

Open page file:
```
src/pages/{nodePage.path__alias}.js
```

Remove JSON output
```
<pre>
    { JSON.stringify(node, {}, 2) }
</pre>
```

Import components
```
import Title from "../components/field/title";
import Body from "../components/field/body";
```

Add components to the page 
```
<Title>{node.title}</Title>

<Body
  content={node?.body?.processed}
/>
```
