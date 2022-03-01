const path = require('path')
const { inlineImagesFieldExtractor } = require(`./src/helpers/node-body-parser`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

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
    const { nodeBodyContent, nodeInlineImages } = inlineImagesFieldExtractor(node);
    if (nodeInlineImages.length === 0) {
      // Create bodyProcessedWithInlineImages field
      createNodeField({
        node, name: "bodyProcessedWithInlineImages",
        value: nodeBodyContent
      });

      return;
    }

    let bodyProcessedWithInlineImages = nodeBodyContent;
    const inlineImageField = [];
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
      // Copied from gatsby-source-drupal

      if (fileNode) {
        inlineImageField.push({
          originalImageUrl: nodeInlineImage.relativePath,
          localFile___NODE: fileNode.id,
        })
      }

      // Replace image relativePath with remotePath
      bodyProcessedWithInlineImages = bodyProcessedWithInlineImages.replace(nodeInlineImage.relativePath, nodeInlineImage.remotePath);
    }

    // Create bodyProcessedWithInlineImages field
    createNodeField({
      node, name: "bodyProcessedWithInlineImages",
      value: bodyProcessedWithInlineImages
    });

    // Create inlineImages field
    if (inlineImageField.length > 0) {
      createNodeField({
        node,
        name: "inlineImages",
        value: inlineImageField,
      });
    }
  }
}