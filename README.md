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

## 2.B - Show/Hide field title feature

Open page file:
```
 src/pages/{nodePage.path__alias}.js
```

Add `field_show_title` to GraphLQ Query
```
    field_show_title
```

Replace original code:

```
<Title>{node.title}</Title>
```

With this code containing the field_show_title value validation to show/hide title

```
{ node.field_show_title && <Title>{node.title}</Title> }
```
