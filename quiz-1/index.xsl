<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/"> 
    <html> 
      <body> 
        <ul>
            <li>
              <article style="margin: 10px;">
                <table border="1">
                  <tr> 
                    <th>ID</th> 
                    <th>NAME</th> 
                    <th>AVAILABLE SIZES</th>
                    <th>PRICE</th> 
                  </tr> 
                  
                  <xsl:for-each select="items/item"> 
                    <tr>
                      <td><xsl:value-of select="@id"/></td>
                      <td><xsl:value-of select="name"/></td>
                      <td>
                        XS  - <xsl:value-of select="size[@description='XS']"/> <br></br><br></br>
                        S  - <xsl:value-of select="size[@description='S']"/> <br></br><br></br>
                        M  - <xsl:value-of select="size[@description='M']"/> <br></br><br></br>
                        L  - <xsl:value-of select="size[@description='L']"/> <br></br><br></br>
                        XL  - <xsl:value-of select="size[@description='XL']"/>
                      </td>

                      <td>
                        <xsl:value-of select="price[@currency='US']"/> <br></br>
                        <xsl:value-of select="price[@currency='CAD']"/>
                      </td>
                    </tr>
                  </xsl:for-each> 
                </table>
              </article>
            </li>
        </ul>
      </body> 
    </html>
  </xsl:template>  
</xsl:stylesheet>