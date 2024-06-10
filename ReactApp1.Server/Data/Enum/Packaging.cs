using System.ComponentModel;

namespace ReactApp1.Server.Data.Enum
{
    public enum Packaging
    {
        [Description("250g")]
        Small,

        [Description("500g")]
        Regular,
        [Description("750g")]
        Large
    }
}
