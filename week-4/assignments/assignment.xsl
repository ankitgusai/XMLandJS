<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/"> 
    <html> 
      <body> 
        <h2>Catalog</h2>
        <ul>
        <xsl:for-each select="catalog/product">
            <li>

              <article style="margin : 20px;">
                <h3><xsl:value-of select="@product_id"/></h3>
                <p><xsl:value-of select="@description"/></p>

                <table border="1">
                  <tr> 
                    <th>Item Number</th> 
                    <th>Price</th> 
                    <th>Gender</th>
                    <th>Small</th>
                    <th>Medium</th>
                    <th>Large</th>
                    <th>Extra Large</th> 
                  </tr> 
                  
                  <xsl:for-each select="catalog_item"> 
                    <tr>
                      <td><xsl:value-of select="item_number"/></td>
                      <td><xsl:value-of select="price"/></td>
                      <td style="text-align: center">                 
                        <xsl:choose>
                            <xsl:when test="@gender = 'Men'">M</xsl:when>
                            <xsl:when test="@gender = 'Women'">W</xsl:when>
                            <xsl:otherwise>U</xsl:otherwise>
                        </xsl:choose>
                      </td>

                     <td><xsl:apply-templates select = "size[@description='Small']" /></td>
                     <td><xsl:apply-templates select = "size[@description='Medium']" /></td>
                     <td><xsl:apply-templates select = "size[@description='Large']" /></td>
                     <td><xsl:apply-templates select = "size[@description='Extra Large']" /></td>

                    </tr>                   
                  </xsl:for-each> 
                </table>
              </article>
            </li>
        </xsl:for-each>
        
        </ul>
      </body> 
    </html>
  </xsl:template>  


 <xsl:template match = "catalog_item/size">       
        <table border="1">
             <tr> 
                <th>Color</th> 
                <th>Image</th>        
             </tr> 
             <tr>
                <td><xsl:value-of select="color_swatch"/></td>
                <td><xsl:value-of select="color_swatch/@image"/></td>
            </tr>                   
                            
            </table>

  </xsl:template>

</xsl:stylesheet>