const path = require('path')

// Download remote images
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
// Parse Dom to find inline images
const DomParser = require("dom-parser")
const inlineImageParser = new DomParser()

const calculateBody = (node) => {
  if (node.field_body && node.field_body.processed) {
    return node.field_body.processed;
  }

  if (node.body && node.body.processed) {
    return node.body.processed;
  }

  return null;
};

exports.onCreateNode = async ({
  createNodeId,
  node,
  actions,
  store,
  cache,
  getCache,
}) => {
  const { createNode, createNodeField } = actions

  const contentTypes = ['node__page', 'node__article'];
  if (contentTypes.includes(node.internal.type)) {
    let bodyContent = calculateBody(node);
    if (bodyContent) {
      const inlineImagesFields = inlineImageParser.parseFromString(bodyContent)
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
      if (nodeInlineImages.length > 0) {
        const nodeInlineImageField = [];
        for (const nodeInlineImage of nodeInlineImages) {
          // Copied from gatsby-source-drupal
          const fileNode = await createRemoteFileNode({
            url: nodeInlineImage.remotePath,
            name: path.parse(decodeURIComponent(nodeInlineImage.remotePath)).name,
            store,
            cache,
            createNode,
            createNodeId,
            getCache,
          })
          if (fileNode) {
            nodeInlineImageField.push({
              originalImageUrl: nodeInlineImage.relativePath,
              localFile___NODE: fileNode.id,
            })
          }
          createNodeField({
            node, name: "bodyProcessedWithInlineImages",
            value: bodyContent.replace(nodeInlineImage.relativePath, nodeInlineImage.remotePath)
          });
        }
        if (nodeInlineImageField.length > 0) {
          createNodeField({
            node,
            name: "inlineImages",
            value: nodeInlineImageField,
          });
        }
      } else {
        createNodeField({ node, name: "bodyProcessedWithInlineImages", value: bodyContent });
      }
    }
  }
}