<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match='/'>
        <html>
            <link rel="stylesheet" type="text/css" href="style.css"/>
            <head>
                <title>My favorite movies</title>
            </head>
            <body>
                <h1>These are the movies I highly recommend</h1>
                <xsl:for-each select="/movies/movie">
                    <div class="card">
                        <xsl:attribute name="style">
                            <xsl:choose>
                                <xsl:when test="@type='science'">
                                    background-color: #ef767a;
                                </xsl:when>
                                <xsl:when test="@type='it'">
                                    background-color: #fc4a1a;
                                </xsl:when>
                                <xsl:when test="@type='action'">
                                    background-color: #26547C;
                                </xsl:when>
                            </xsl:choose>
                        </xsl:attribute>
                        <h3>
                            <xsl:value-of select="title"/>
                        </h3>
                        <h4>
                            <xsl:value-of select="author"/>
                        </h4>
                        <img width="190px" height="300px">
                            <xsl:attribute name="src">
                                <xsl:value-of select="artbook"/>
                            </xsl:attribute>
                        </img>
                    </div>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>