const DomParser = require("dom-parser");
const inlineImageParser = new DomParser();

const calculateBody = (node) => {
  if (node.field_body && node.field_body.processed) {
    return node.field_body.processed;
  }

  if (node.body && node.body.processed) {
    return node.body.processed;
  }

  return null;
};

const inlineImagesFieldExtractor = (node) => {
  const nodeBodyContent = calculateBody(node);
  if (!nodeBodyContent) {
    return {
      nodeBodyContent: nodeBodyContent,
      nodeInlineImages: []
    };
  }

  const inlineImagesFields = inlineImageParser.parseFromString(nodeBodyContent)
  const inlineImages = inlineImagesFields.getElementsByTagName("img")
  const nodeInlineImages = [];
  inlineImages.forEach(inlineImage => {
    inlineImage.attributes.forEach(async (inlineImageAttrs) => {
      if (inlineImageAttrs.name === 'src') {
        const imageUrl = `https://dev-gatsbyconf.pantheonsite.io${inlineImageAttrs.value}`;
        nodeInlineImages.push({
          relativePath: inlineImageAttrs.value,
          remotePath: imageUrl
        });
      }
    })
  });

  return {
    nodeBodyContent,
    nodeInlineImages
  };
}

module.exports = {
  inlineImagesFieldExtractor
}
